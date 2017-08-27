var esprima = require( 'esprima' );

export class EnaploParser {
  private ast: any;

  constructor( private data: string ) {
    this.ast = esprima.parseScript( data );
  }

  public findJqueryDomIdHtmlCallParameter( domId: string ) {
    // $('#enaploAktaFa').html(...)
  }

  public ignore() {
    // aktaTreeInit('#enaploAktaFa');
    // initEgyszakta(true,true);
    // $('#page_enaplok').data('inited','1');
  }

}
