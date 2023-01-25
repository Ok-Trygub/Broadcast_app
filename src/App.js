import {useEffect} from "react";
import {fetchTodos} from "./store/slices/contacts";
import {useDispatch, useSelector} from "react-redux";

function App() {
    // const dispatch = useDispatch();
    // const {status, error} = useSelector(state =>state.contacts);
    //
    //
    // useEffect(() => {
    //     dispatch(fetchTodos())
    // }, [dispatch])

    return (
        <div className="App">
            {/*{status === 'loading' && <h2>Loading...</h2>}*/}
            {/*{error && <h2>Next error: {error}</h2>}*/}

<p>ddd</p>

        </div>
    );
}

export default App;
