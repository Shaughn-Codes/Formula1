import { useRouter } from "next/router";
import "/src/app/globals.css";



export default function Driver({driverInfo}){
    const router = useRouter();
    const {id} = router.query;
    const teamName = driverInfo.vehicles && driverInfo.vehicles.length > 0 ? driverInfo.vehicles[0].team : 'Unknown';
    return (
        <div className="space-x-4">
        <h1 className="font-bold text-red-600 underline text-3xl">{driverInfo.displayName} for {teamName} </h1>
        <pre>{JSON.stringify(driverInfo, null, 2)}</pre>
        <img src={driverInfo.headshot} class='size-min'></img>
        <img class='size-min' src={driverInfo.flag.href}></img>
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