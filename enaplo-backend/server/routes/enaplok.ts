import * as express from 'express';
import { EnaploParser } from '../util/enaplo-parser';

export class RouterEnaplok {
  register( router: express.Router ) {
    router.get( '/api/enaplok', ( request: express.Request, response: express.Response, next: express.NextFunction ) => {
      response.json(
        {
          type: "proxy",
          url: "http://localhost:3000/enaplo_demo/ajax?method=enaplok_adatok&id=%23page_enaplok&htmlid=${htmlid}&_=${time}"
        }
      );
    });

    router.post( '/api/enaplok', ( request: express.Request, response: express.Response, next: express.NextFunction ) => {
      const data = request.body.data;
      const jsParser = new EnaploParser( data );
      const htmlData = jsParser.findJqueryDomIdHtmlCallParameter( 'enaploAktaFa' );
      //var htmlStructure = htmlParser.get( '/ul/li/div[azon]', '/ul/li/div/strong' );

      response.json(
        {
          type: "data",
          data:
          [
            { id: '23130', x: '2017/340/7', name: 'ház2', address: '1039 Budajenő HRSZ:1234', owner: { name: 'Gabtoth72', nuj: '235847809' } },
            { id: '23129', x: '2017/1347/4', name: 'ház1', address: '1034 Bucsa HRSZ:1234', owner: { name: 'Gabtoth72', nuk: '235847809' } }
          ]
        }
      );
    });
  }
}

/*
<ul class='fa_naplo keret'>
   <li class='r0 sajatakta'>
      <div class='naploelem' title='Az E-napló adatainak megmutatása' style='padding-left:6px;' tipus=0 azon='23130'>
        <i class='icon-null'></i> 
        <i class='icon-book' title='e-napló'></i> 
        <strong>2017/340/7 ház2: 1039 Budajenő HRSZ:1234 (Gabtoth72 - 235847809)</strong> 
        <i class='icon-user' title='Szerep'></i> 
        <i class='icon-home' title='Saját e-napló'></i>
      </div>
   <li class='r1 sajatakta'>
      <div class='naploelem' title='Az E-napló adatainak megmutatása' style='padding-left:6px;' tipus=0 azon='23129'>
        <i class='icon-chevron-right' title='Az összes fő/alnapló beolvasása' openstate=9></i> <i class='icon-book' title='e-napló'></i> 
        <strong>2017/1347/4 ház1: 1034 Bucsa HRSZ:1234 (Gabtoth72 - 235847809)</strong> 
        <i class='icon-user' title='Szerep'></i> 
        <i class='icon-home' title='Saját e-napló'></i>
      </div>
</ul>
*/
