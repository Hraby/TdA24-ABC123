import "./dashboard.css";
import Stats from "@/components/stats/stats";

export default function Dashboard(){
    return (
        <div className="dashboard">
            <h1>Lektorská zóna</h1>
            <div className="w-full flex justify-between">
                <Stats icon="/people.png" name="Počet studentů" data="5" time={true}/>
                <Stats icon="/clock.png" name="Nejoblíbenější časy" data="8-11" time={true}/>
                <Stats icon="/star.png" name="Hodnocení" data="100%" time={false}/>
            </div>
        </div>
    )
}