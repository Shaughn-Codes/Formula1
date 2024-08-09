import { useRouter } from "next/router";
import "/src/app/globals.css";



export default function Driver({driverInfo}){
    const router = useRouter();
    const {id} = router.query;
    const teamName = driverInfo.vehicles && driverInfo.vehicles.length > 0 ? driverInfo.vehicles[0].team : 'Unknown';
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={driverInfo.headshot} className="max-w-sm rounded-lg shadow-2xl"></img>
        <div>
        <h1 className="text-2xl">{driverInfo.displayName} for {teamName} </h1>
        <p>
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        </div>
        {/* <img class='size-min' src={driverInfo.flag.href}></img> */}
        </div>
        </div>
        
    );
}

export async function getServerSideProps(context) {
    const {id} = context.params;
    const response = await fetch(`http://localhost:8080/get-driver-info/${id}`)
    const driverInfo = await response.json();

    return{
        props: {
            driverInfo
        }
    };
    
}