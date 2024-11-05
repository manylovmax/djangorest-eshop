import React from "react";


export default class AdminCreateProductPage extends React.Component {
    state = {
        categories: [],
        form: {
            title: '',
            price: 0,
            description: ''
        }
    }

    componentDidMount() {
        // axios.get('http://0.0.0.0:80/categories').then(response => {
        //     this.setState({
        //         ...this.state,
        //         categories: response.data
        //     });
        // });
        
    }


    render() {
        return (
        <div className="container">
            <h1>Регистрация продукта</h1>
            <div className="row">
                <div className="col-md-12">

                    <div className="mb-3">
                        <label htmlFor="categorySelect">Категория</label>
                        <select className="form-select" id="categorySelect" name="parent_category" >
                            {this.state.categories.map((category, idx) => (
                                <option key={idx} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputTitle" className="form-label">Название</label>
                        <input type="text" className="form-control" id="inputTitle" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputPrice" className="form-label">Стоимость</label>
                        <input type="text" className="form-control" id="inputPrice" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="textareaDescription" className="form-label">Описание</label>
                        <textarea className="form-control" id="textareaDescription" rows="3"></textarea>
                    </div>

                    <div>
                        <div className="btn btn-primary">Зарегистрировать</div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
