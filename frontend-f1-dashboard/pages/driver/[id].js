import { useRouter } from "next/router";

export default function Driver({driverInfo}){
    const router = useRouter();
    const {id} = router.query;
    const teamName = driverInfo.vehicles && driverInfo.vehicles.length > 0 ? driverInfo.vehicles[0].team : 'Unknown';
    return (
        <div>
        <h1>{driverInfo.displayName} for {teamName} </h1>
        <pre>{JSON.stringify(driverInfo, null, 2)}</pre>
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