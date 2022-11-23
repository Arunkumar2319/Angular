import { Component } from '@angular/core';
import { catchError, concat, filter, forkJoin, from, groupBy, interval, map, mapTo, merge, mergeMap, of, reduce, switchMap, take, toArray, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'learningrxjs';
  ngOnInit(){

    // of operator
    let test = of(1,2,4)
    let test2 = test.pipe(filter(x => x%2 == 0))
    test2.subscribe(x => console.log("fetched ", x))
    // console.log("testing observable", test2)

    // from operator
    let  heroArray = [{name:'arun',heroId: 2, totalMovies: 3},{name:'praveen',heroId: 1, totalMovies: 4},{name:'abi',heroId: 3, totalMovies: 5}]
    let testObj = from(heroArray)
    testObj.subscribe(x => console.log("from array works", x.name))


    // filter operator
    let mergedObj = of(heroArray)
    let finalmerged = mergedObj.pipe(map(val => val.filter(x => x.name)))
    finalmerged.subscribe(x => console.log("merged name mapping", x))

    // reduce operator
    let numberObs = of(5,10,13,15,20,30,45)
    let filterObs = numberObs.pipe(filter(x => x%5 === 0),reduce((srcVal,curr) => srcVal+curr))
    let reducedObs = filterObs.subscribe(x => console.log("reduced value", x))

    this.mappingOperators();
    // this.combinationOperators();
  }
  
  mappingOperators(){
   
    // mergeMap
    let data = of('arun','abi','praveen','jenni')
    let role = of('Dev1', 'Dev2', 'Dev3','tester')
    let roleMapObs = data.pipe(mergeMap(x => role.pipe(map(y => x+y ))))
    // let final_val = merge(data,role)
    // final_val.subscribe(x => console.log("final array", x))
    // let roleMapObs = data.pipe(mergeMap(x => interval(1000).pipe(map(y =    > x+y ))))
    roleMapObs.subscribe(x => console.log("merge map op", x))

    // switchMap
    let switchedObs = data.pipe(switchMap(val => of(val+'tada',val+'dada', val+'bada')))
    switchedObs.subscribe(x => console.log("switch map", x))

    // Mapto 
    let time = interval(1000).pipe(take(3))
    let maptoObs = time.pipe(mapTo('Ideassion'))
    maptoObs.subscribe(x => console.log("map to op",x))

    // groupBy
    let  heroArray = [{name:'arun',heroId: 2, totalMovies: 3},{name:'praveen',heroId: 1, totalMovies: 4},{name:'abi',heroId: 3, totalMovies: 5},{name:'jenni',heroId: 3, totalMovies: 7}]
    let groupObs = from(heroArray).pipe(groupBy(name => name.heroId),mergeMap(group => group.pipe(toArray())))
    groupObs.subscribe(x => console.log("grpBy ",x))
    // groupBywithZip
    let groupObsNew = from(heroArray).pipe(groupBy(name => name.totalMovies),mergeMap(group => zip(of(group.key),group.pipe(toArray()))))
    groupObsNew.subscribe(x => console.log("grpBy based on zip",x))

  }
  combinationOperators(){
    // merge
    let list1 = of(2, 3, 4, 5, 6);
    let list2 = of(4, 9, 16, 25, 36)
    let final_val = merge(list1,list2)
    final_val.subscribe(x => console.log("merged list",x));

    // conCat
    let obs = concat(of(1,2,4),of('done','some','thing'))
    obs.subscribe(x => console.log("concat mappinf",x))
    let obs_merge = merge(of(1,2,4,6,7),of('done','some','thing'))
    obs_merge.subscribe(x => console.log("merged val", x))
    
    // ForkJoin 
    let obs1 = of('angular','react','express')
    let obs2 = of('excellent','average','good')
    let obs3 = of('1.7','1','1.2')
    let collection = forkJoin({sourceOne: obs1,sourcetwo: obs2, sourcethree: obs3}).pipe(catchError(error => of(error)))
    collection.subscribe(x => console.log("forkjoin op", x))
  }
}
