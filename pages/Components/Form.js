import styles from '../../styles/Home.module.css'
import formStyles from '../../styles/Form.module.css'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Form() {

      // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // console.log(event.target.serviceCode.value)

        // Get data from the form. //temp for now
        const data = {
        services:
            [{ serviceCode: event.target.serviceCode.value }],
            productCode: "SM-F711BZEBEUA",
            qty: 1
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/tokocommercewebservices/v2/uk/addToCart/multi/?fields=BASIC'

        // Form the request for sending data to the server.
        const options = {
        // The method is POST because we are sending data.
        method: 'POST',
        // Tell the server we're sending JSON.
        headers: {
            'Content-Type': 'application/json',
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        alert(`is this what you looking for?: ${result.data}`)
    }

    const { data, error } = useSWR('https://p1-smn2-api-cdn.shop.samsung.com/tokocommercewebservices/v2/uk/servicesv2/externalService/SM-F926BZKDEUA?categoryCode=smc&provider=SMC&lang=en_GB&curr=GBP', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>


    const samsungInfo = data.serviceProductDataGroup.serviceProducts[0].serviceProductVariants

    console.log(samsungInfo)


  return (
    <div className={styles.container}>

    <form onSubmit={handleSubmit}>

        {samsungInfo.map((info, idx) => (

            <button key={idx} className="mat-radio-button option-box mat-accent" tabIndex="-1" id="mat-radio-11">
            <label className="mat-radio-label" htmlFor="mat-radio-11-input">
                <div className="mat-radio-container">
                    <div className="mat-radio-outer-circle"></div>
                    <div className="mat-radio-inner-circle"></div>
                    <input type="radio" className="mat-radio-input cdk-visually-hidden"
                        id="mat-radio-11-input" tabIndex="0" required="" name="serviceCode" value={info.code}/>
                    <div mat-ripple="" className="mat-ripple mat-radio-ripple mat-focus-indicator">
                        <div className="mat-ripple-element mat-radio-persistent-ripple"></div>
                    </div>
                </div>
                <div className="mat-radio-label-content">
                    <span style={{display: "none"}}>&nbsp;</span>
                    <div className="spacer">
                        <div className="option-box__label">
                        <div className="option-box__name">{info.name}</div>
                        <div id="serviceCode" className="option-box__code">{info.code}</div>
                        </div>
                        <div className="option-box__price"> £{info.priceData.value}.00 </div>
                    </div>
                </div>
            </label>
        </button>

        ))}

        <button type="submit">Submit</button>
    </form>
</div>

        // {
//     "services": [
//         {
//             "serviceCode": "SMC-ADH-MOB-FLIP-2Y"
//         }
//     ],
//     "productCode": "SM-F711BZEBEUA",
//     "qty": 1
// }
)
}