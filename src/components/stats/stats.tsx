import "./stats.css"

export default function Stats({icon, name, data, time}: {icon: string, name: string, data: string, time: boolean}){
    return(
        <div className="dashboard-stats">
            <div className="stats-content flex gap-4">
                <div className="icon">
                    <img src={icon}></img>
                </div>
                <div className="stats-content">
                    <h2>{name}</h2>
                    <span>{data}</span>
                </div>
            </div>
            {time == true && (
            <div className="stats-time">
                <span>test</span>
            </div>
            )}
        </div>
    )
}