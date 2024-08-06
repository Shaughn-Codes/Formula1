export default function DriverList(){
    return <h1>Driver List</h1>
}

export async function getServerSideProps() {
    const response = await fetch(`http://localhost:8080/get-driver-info/${id}`)
    const data = await response.json();
}