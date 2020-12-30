import React from 'react';
import { ApiUrl } from '../../constans/ApiUrl';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class SearchModal extends React.Component {
    state = {
        searchWord: null,
        results: [],
        lastKeyPressedTimeStamp: null
    }

    render() {
        const { searchWord, results } = this.state;
        return (
            <div className="mt-2">
                <div className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-2" placeholder="Search" value={searchWord} onChange={e => {console.log(e); this.onPressKey(e)}}/>
                </div>
                {results.length > 0 && searchWord &&
                <div className="card position-absolute" style={{ maxHeight: '200px', overflow: 'scroll', zIndex: 10, width: '200px', overflow: 'hidden' }}>
                    {!results[0].info ? <div className="p-3">
                        {results.map(user => (
                            <div className="pb-3">
                                <a href={"/users/" + user.name} className="text-dark">{user.name}</a>
                            </div>
                        ))}
                    </div> : <div>{results[0].info}</div>}
                </div>}
            </div>
        )
    }

    onPressKey = (e) => {
        const searchWord = e.target.value;
        clearTimeout(this.timer);
        console.log(e.timeStamp);
        console.log(this.state.lastKeyPressedTimeStamp);

        console.log(e.timeStamp - this.state.lastKeyPressedTimeStamp);
        this.setState({ searchWord: e.target.value });

        if(e.timeStamp - this.state.lastKeyPressedTimeStamp > 1000) {
            this.search(searchWord);
        } else {
            this.timer = setTimeout(() => {
                this.search(searchWord);
            }, 1000);
        }

        this.setState({ lastKeyPressedTimeStamp: e.timeStamp });

    }

    search = searchWord => {
        console.log(this.props.user.token);
        console.log(searchWord);
        fetch(ApiUrl + 'users/search', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                searchWord: searchWord
            })
        })
        .then(response => response.json())
        .then((results) => {
            console.log(results);
            if(results.length === 0) {
                this.setState({ results: [{ info: 'No results found.' }] });
            } else {
                this.setState({ results: results });
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = () => {
    return {  }
}
export default connect(mapStateToProps, mapDispatchToProps())(SearchModal);