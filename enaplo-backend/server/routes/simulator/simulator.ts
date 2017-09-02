import { Request, Response, Router, NextFunction } from 'express';
import { BaseRouter } from '../base-router';

export class RouterSimulator extends BaseRouter {
  register( router: Router ) {
    router.get( '/enaplo_demo/ajax', ( request: Request, response: Response, next: NextFunction ) => {
      const htmlid = request.query.htmlid;
      const method = request.query.method;
      if ( !this.checkHtmlId( response, htmlid ) ) {
        return;
      }
      response.setHeader( 'Content-type', 'test/html; charset=utf-8' );
      switch ( method ) {
        case 'enaplok_adatok':
          response.send( '$(\'#enaploAktaFa\').html(\'<ul class=\\\'fa_naplo keret\\\'><li class=\\\'r0 sajatakta\\\'><div class=\\\'naploelem\\\' title=\\\'Az E-napló adatainak megmutatása\\\' style=\\\'padding-left:6px;\\\' tipus=0 azon=\\\'23167\\\'><i class=\\\'icon-null\\\'></i> <i class=\\\'icon-book\\\' title=\\\'e-napló\\\'></i> <strong>2017/2708/1 ház2: 1111 Cakóháza HRSZ:123-121/123 (Gabtoth73 - 130840570)</strong> <i class=\\\'icon-user\\\' title=\\\'Szerep\\\'></i> <i class=\\\'icon-home\\\' title=\\\'Saját e-napló\\\'></i></div><li class=\\\'r1 sajatakta\\\'><div class=\\\'naploelem\\\' title=\\\'Az E-napló adatainak megmutatása\\\' style=\\\'padding-left:6px;\\\' tipus=0 azon=\\\'23166\\\'><i class=\\\'icon-null\\\'></i> <i class=\\\'icon-book\\\' title=\\\'e-napló\\\'></i> <strong>2017/1244/1 ház1 (tesztszöveg:): 1031 Abádszalók HRSZ:1234:() (Gabtoth73 - 130840570)</strong> <i class=\\\'icon-user\\\' title=\\\'Szerep\\\'></i> <i class=\\\'icon-home\\\' title=\\\'Saját e-napló\\\'></i></div></ul>\');aktaTreeInit(\'#enaploAktaFa\');' );
          break;
        case 'get_naplo_items':
          this.getNaploItems( request, response, );
          break;
        case 'vallalkozoinaplokkarton_load':
        default:
          this.badRequest( response, 'Unknown method ' + method );
          break;
      }
    } );
  }

  getNaploItems( request: Request, response: Response ) {
    const aktaid = request.query.aktaid;
    if ( !this.checkParameter( response, 'aktaid', aktaid ) ) {
      return;
    }
    switch ( aktaid ) {
      case '23166':
        response.send( 'insertNaploItems(\'enaploAktaFa\',\'23129\',\'<ul class=\\\'fa_naplo\\\'><li class=\\\'r0\\\'><div class=\\\'naploelem sajat\\\' style=\\\'padding-left:38px;\\\' tipus=1 azon=\\\'23129|20963\\\' title=\\\'Az E-főnapló adatainak megmutatása\\\'><i class=\\\'icon-null\\\'></i> <i class=\\\'icon-list\\\' title=\\\'E-főnapló\\\'></i> 2017/1347/4-1 blabla (Építtető) <i class=\\\'icon-user\\\' title=\\\'Szerep\\\'></i></div></li><li class=\\\'r1\\\'><div class=\\\'naploelem sajat\\\' style=\\\'padding-left:38px;\\\' tipus=1 azon=\\\'23129|20964\\\' title=\\\'Az E-főnapló adatainak megmutatása\\\'><i class=\\\'icon-null\\\'></i> <i class=\\\'icon-list\\\' title=\\\'E-főnapló\\\'></i> 2017/1347/4-2 alap (Építtető, Kivitelező - napijelentésért felelős, Kivitelező - napijelentésre jogosult) <i class=\\\'icon-user\\\' title=\\\'Szerep\\\'></i></div></li></ul>\');' )
        break;
      // 23167
      default:
        this.noSuchElement( response, 'No Naplo with id ' + aktaid );
        break;
    }
  }

  checkHtmlId( response: Response, htmlid: string ): boolean {
    if ( htmlid != 'f8daeec805c629b087a93d340721ef00' ) {
      response.sendStatus( 403 ); // forbidden
    }
    return true;
  }
}
