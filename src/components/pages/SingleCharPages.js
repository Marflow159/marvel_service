import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import './singleComicPage.scss';
import setContent from '../../utils/setContent';


const SingleCharPage = () => {
    const { charId } = useParams();
    const [char, setChar] = useState(null)

    const { getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [])

    const updateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }


    return (
        <>
            {setContent(process, View, char)}
        </>
    )
}

const View = ({ data }) => {
    const { description, name, thumbnail } = data

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to='/' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleCharPage;