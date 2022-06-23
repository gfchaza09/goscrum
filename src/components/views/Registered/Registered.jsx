import { useParams } from 'react-router-dom';

export const Registered = () => {

    const { teamID } = useParams()

    return <div className="container">¡Te registraste exitosamente! El team ID de tu equipo es: {teamID}</div>
}