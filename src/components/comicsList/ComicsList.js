import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />
            break;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />;
            break;
        case 'confirmed':
            return <Component />;
            break;
        case 'error':
            return <ErrorMessage />;
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {

    const [com, setCom] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [comEnded, setComEnded] = useState(false)

    const { getAllComics, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicsLoaded = (newCom) => {
        let ended = false
        if (newCom.length < 8) {
            ended = true
        }

        setCom([...com, ...newCom])
        setNewItemLoading(false);
        setOffset(offset + 8)
        setComEnded(ended)
    }

    const renderCom = (com) => {
        const comics = com.map((item) => {

            return (
                <li className="comics__item"
                    tabIndex={0}
                    key={item.id}
                >
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">={item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {comics}
            </ul>
        )
    }


    return (
        <div className="comics__list">
            {setContent(process, () => renderCom(com), newItemLoading)}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ 'display': comEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div >
    )
}

export default ComicsList;