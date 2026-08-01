// Imports the published FrontierNav Xenoblade graph that powers its interactive
// maps. The generated snapshot keeps exact map geometry, collection rates and
// enemy-spawn relationships plus locally cached z1 map tiles.
const fs=require("fs"),path=require("path"),vm=require("vm");
const INDEX="https://frontiernav.net/api/namespaces/xenoblade-chronicles/index.json";
const BASE="https://frontiernav.net";
const OUT=path.join(__dirname,"data","frontier-map-data.js"),TILE_DIR=path.join(__dirname,"assets","frontier-maps");
const BUILD_STAMP="source-snapshot";
function loadWorld(){const c={};vm.runInNewContext(fs.readFileSync(path.join(__dirname,"data","world-data.js"),"utf8").replace("const WORLD_DATA","WORLD_DATA"),c);return c.WORLD_DATA;}
function relationEnd(graph,entity,key){const ids=Object.keys(entity.data[key]||{});return ids.map(id=>graph.relationships[id]?.end).filter(Boolean);}
function oneEnd(graph,entity,key){return relationEnd(graph,entity,key)[0]||"";}
function fileName(id){return id.replace(/[^a-z0-9-]+/gi,"-");}
async function binary(url){const response=await fetch(url);if(!response.ok)throw new Error(`${url}: HTTP ${response.status}`);return Buffer.from(await response.arrayBuffer());}
async function main(){
  const index=await (await fetch(INDEX)).json(),attachment=index.graph;
  const graphUrl=`${BASE}/files/user-content/xenoblade-chronicles/${attachment.hash}.${attachment.size}.json`;
  const graph=await (await fetch(graphUrl)).json(),world=loadWorld();fs.mkdirSync(TILE_DIR,{recursive:true});
  const lockouts=new Map(world.areas.filter(area=>area.lockoutDeadline).map(area=>[area.name.toLowerCase(),area.lockoutDeadline]));
  const entities=graph.entities,maps=[];
  for(const map of Object.values(entities).filter(entity=>entity.type==="Map").sort((a,b)=>a.data.name.localeCompare(b.data.name))){
    const regionId=oneEnd(graph,map,"Map-AREA"),region=entities[regionId]?.data.name||regionId;
    const tileId=Object.keys(map.data["MapTile-MAP-Map"]||{}).map(id=>graph.relationships[id]?.start).find(Boolean),tile=entities[tileId];if(!tile?.data.path)continue;
    const tiles=[];
    for(let y=0;y<2;y++)for(let x=0;x<2;x++){const url=`${BASE}/files/games/xenoblade-chronicles/maps/tiles/${tile.data.path}/1/tile_${x}_${y}.${tile.data.extension||"png"}`;const local=`assets/frontier-maps/${fileName(map.id)}-1-${x}-${y}.${tile.data.extension||"png"}`,disk=path.join(__dirname,local);if(!fs.existsSync(disk))fs.writeFileSync(disk,await binary(url));tiles.push({x,y,local,url});}
    const points=[];
    for(const featureRelId of Object.keys(map.data["MapFeature-MAP-Map"]||{})){
      const featureId=graph.relationships[featureRelId]?.start,feature=entities[featureId];if(!feature?.data.geometry||feature.data.geometry.type!=="Point")continue;
      const targetId=oneEnd(graph,feature,"MapFeature-MAP_TARGET"),target=entities[targetId];if(!target)continue;
      const base={id:target.id,name:target.data.name,type:target.type,coordinates:feature.data.geometry.coordinates,source:`https://frontiernav.net/wiki/xenoblade-chronicles/entities/${target.id}`};
      if(target.type==="CollectionPoint")base.items=relationEnd(graph,target,"CollectionPoint-COLLECTIBLES").map(id=>{const relationship=graph.relationships[`${target.id}__CollectionPoint-COLLECTIBLES__${id}`],item=entities[id];return{name:item?.data.name||id,rate:relationship?.data?.rates?.[0]?.rate??null};});
      else if(target.type==="EnemySpawnPoint")base.spawns=relationEnd(graph,target,"EnemySpawnPoint-SPAWNS").map(id=>{const spawn=entities[id],enemyId=spawn?oneEnd(graph,spawn,"EnemySpawn-ENEMY"):"",enemy=entities[enemyId];return{name:enemy?.data.name||spawn?.data.name||id,level:spawn?.data.level??enemy?.data.level??null,quest:!!spawn?.data.quest,missable:!!spawn?.data.missable,rate:graph.relationships[`${target.id}__EnemySpawnPoint-SPAWNS__${id}`]?.data?.rates?.[0]?.rate??null};});
      if(["CollectionPoint","EnemySpawnPoint","Landmark"].includes(target.type))points.push(base);
    }
    maps.push({id:map.id,name:map.data.name.replace(/ \(Map\)$/,""),regionId,region,lockoutDeadline:lockouts.get(region.toLowerCase())||"",tiles,points,source:`https://frontiernav.net/wiki/xenoblade-chronicles/visualisations/maps/entities/${map.id}`});
  }
  const counts={maps:maps.length,points:maps.reduce((n,map)=>n+map.points.length,0),collectionPoints:maps.reduce((n,map)=>n+map.points.filter(point=>point.type==="CollectionPoint").length,0),enemySpawnPoints:maps.reduce((n,map)=>n+map.points.filter(point=>point.type==="EnemySpawnPoint").length,0),landmarks:maps.reduce((n,map)=>n+map.points.filter(point=>point.type==="Landmark").length,0)};
  const data={version:1,generated:BUILD_STAMP,license:{label:"FrontierNav community graph · CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/"},source:{label:"FrontierNav Xenoblade Chronicles graph",url:"https://frontiernav.net/wiki/xenoblade-chronicles/visualisations/maps",indexUrl:INDEX,graphUrl,updatedAt:graph.updatedAt},projection:"Web Mercator; GeoJSON coordinates are [longitude, latitude].",counts,maps};
  fs.writeFileSync(OUT,`// Generated by build-frontier-map-data.js.\nconst FRONTIER_MAP_DATA=${JSON.stringify(data,null,2)};if(typeof window!=="undefined")window.FRONTIER_MAP_DATA=FRONTIER_MAP_DATA;\n`);console.log(JSON.stringify(counts,null,2));
}
main().catch(error=>{console.error(error.stack||error);process.exitCode=1;});
