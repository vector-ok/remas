import Currency from "../../models/currency";
// import {sanitize} from "dompurify";
import DOMPurify from "dompurify";

interface CurrencyCodeProps {
	currency: Currency | null | undefined;
}

function CurrencyCode({currency, ...props}: CurrencyCodeProps): JSX.Element {
	return <>{currency && <span {...props} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(currency.htmlCode)}} />}</>;
}

export default CurrencyCode;
