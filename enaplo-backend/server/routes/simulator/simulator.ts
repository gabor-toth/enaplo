import * as express from 'express';

export class RouterSimulator {
  register( router: express.Router ) {
    router.get( '/enaplo_demo/ajax?method=enaplok_adatok', ( request: express.Request, response: express.Response, next: express.NextFunction ) => {
      const htmlid = request.query.htmlid;
      const method = request.query.method;
      if ( !this.checkHtmlId( htmlid, response ) ) {
        return;
      }
      response.setHeader( 'Content-type', 'test/html; charset=utf-8' );
      switch ( method ) {
        case 'enaplok_adatok':
          response.send( '$(\'#enaploAktaFa\').html(\'<ul class=\\\'fa_naplo keret\\\'><li class=\\\'r0 sajatakta\\\'><div class=\\\'naploelem\\\' title=\\\'Az E-napló adatainak megmutatása\\\' style=\\\'padding-left:6px;\\\' tipus=0 azon=\\\'23130\\\'><i class=\\\'icon-null\\\'></i> <i class=\\\'icon-book\\\' title=\\\'e-napló\\\'></i> <strong>2017/340/7 ház2: 1039 Budajenő HRSZ:1234 (Gabtoth72 - 235847809)</strong> <i class=\\\'icon-user\\\' title=\\\'Szerep\\\'></i> <i class=\\\'icon-home\\\' title=\\\'Saját e-napló\\\'></i></div><li class=\\\'r1 sajatakta\\\'><div class=\\\'naploelem\\\' title=\\\'Az E-napló adatainak megmutatása\\\' style=\\\'padding-left:6px;\\\' tipus=0 azon=\\\'23129\\\'><i class=\\\'icon-chevron-right\\\' title=\\\'Az összes fő/alnapló beolvasása\\\' openstate=9></i> <i class=\\\'icon-book\\\' title=\\\'e-napló\\\'></i> <strong>2017/1347/4 ház1: 1034 Bucsa HRSZ:1234 (Gabtoth72 - 235847809)</strong> <i class=\\\'icon-user\\\' title=\\\'Szerep\\\'></i> <i class=\\\'icon-home\\\' title=\\\'Saját e-napló\\\'></i></div></ul>\');aktaTreeInit(\'#enaploAktaFa\');initEgyszakta(true,true);$(\'#page_enaplok\').data(\'inited\',\'1\');' );
          break;
        case 'get_naplo_items':
          response.send( 'insertNaploItems(\'enaploAktaFa\',\'23129\',\'<ul class=\\\'fa_naplo\\\'><li class=\\\'r0\\\'><div class=\\\'naploelem sajat\\\' style=\\\'padding-left:38px;\\\' tipus=1 azon=\\\'23129|20963\\\' title=\\\'Az E-főnapló adatainak megmutatása\\\'><i class=\\\'icon-null\\\'></i> <i class=\\\'icon-list\\\' title=\\\'E-főnapló\\\'></i> 2017/1347/4-1 blabla (Építtető) <i class=\\\'icon-user\\\' title=\\\'Szerep\\\'></i></div></li><li class=\\\'r1\\\'><div class=\\\'naploelem sajat\\\' style=\\\'padding-left:38px;\\\' tipus=1 azon=\\\'23129|20964\\\' title=\\\'Az E-főnapló adatainak megmutatása\\\'><i class=\\\'icon-null\\\'></i> <i class=\\\'icon-list\\\' title=\\\'E-főnapló\\\'></i> 2017/1347/4-2 alap (Építtető, Kivitelező - napijelentésért felelős, Kivitelező - napijelentésre jogosult) <i class=\\\'icon-user\\\' title=\\\'Szerep\\\'></i></div></li></ul>\');' )
          break;
        case 'vallalkozoinaplokkarton_load':
        default:
          response.sendStatus( 404 ); // not found
          break;
      }
    });
  }

  checkHtmlId( htmlid: string, response: express.Response ): boolean {
    if ( htmlid != 'f8daeec805c629b087a93d340721ef00' ) {
      response.sendStatus( 403 ); // forbidden
    }
    return true;
  }
}
