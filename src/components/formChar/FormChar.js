import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup'
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
const FormChar = () => {
    const [char, setChar] = useState(null)
    const [charId, setCharId] = useState(null)
    const [oneChar, setOneChar] = useState([])
    const [fail, setFail] = useState(false)
    const { getCharacters } = useMarvelService();


    useEffect(() => {
        if (char) (
            getCharacters(char)
                .then(e => {
                    if (e.length === 0) {
                        setFail(true)
                    } else {
                        setFail(false)
                        setOneChar(e[0].name);
                        setCharId(e[0].id);
                    }


                })
        )
    }, [char])

    const check = (value) => {
        setChar(value.name)
    }
    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('This field is required'),

                })}
                onSubmit={values => check(values)}>
                <Form className="form">
                    <label htmlFor="name">Or find a character by name:</label>
                    <Field
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter name"
                    />
                    <ErrorMessage className='error' name="name" component="div" />
                    <div style={fail ? { display: "block" } : { display: "none" } }>The character was not found. Check the name and try again</div>
                    <button type="submit">Find</button>
                </Form>
            </Formik >
            <div style={oneChar === char ? { display: "block" } : { display: "none" }}>
                {`There is! Visit ${char} page?`}
                <Link to={`/${charId}`}><b>to page</b></Link>
            </div>
        </>

    )
}
export default FormChar;