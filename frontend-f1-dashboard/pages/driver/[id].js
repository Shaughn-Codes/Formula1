import { useRouter } from "next/router";

export default function Driver({driverInfo}){
    const router = useRouter();
    const {id} = router.query;
    return (
        <div>
        <h1>Driver Information for {driverInfo.displayName}</h1>
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