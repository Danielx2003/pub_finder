import './Pub.css'

type PubProps = {
    name: string
    longitude: number
    latitude: number
}

export default function Pub({name, longitude, latitude}: PubProps) {
    return (
        <div className="pub-card">
            <h3 className="pub-name">{name}</h3>
            <div className="pub-details">
                <p className="pub-detail">
                    <span className="pub-label">Coordinates:</span>
                    <span className="pub-value">{latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E</span>
                </p>
            </div>
        </div>
    )
}