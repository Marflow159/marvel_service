import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {
    const { request, clearError, process, setProcess } = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=69d1a7521d344c830f472ed5db3ac28c';
    const _baseOffset = 210;

    const getCharacters = async (name) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?name=${name}&apikey=69d1a7521d344c830f472ed5db3ac28c`)
        return res.data.results.map(_transformCharacter);
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }


    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0])
    }

    const _transformComics = (com) => {
        return {
            id: com.id,
            title: com.title,
            description: com.description || 'no desc',
            pageCount: com.pageCount ? `${com.pageCount} p.` : 'No page',
            price: com.prices[0].price ? `${com.prices[0].price}$` : "not available",
            thumbnail: com.thumbnail.path + "." + com.thumbnail.extension,
            language: com.textObjects.language || 'en-us',
            url: com.urls[0].url,
        }
    }

    return {
        setProcess,
        getAllCharacters,
        getCharacter,
        clearError,
        getAllComics,
        getComic,
        getCharacters,
        process
    }
}

export default useMarvelService
