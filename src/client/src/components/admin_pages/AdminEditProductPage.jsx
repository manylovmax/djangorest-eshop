import React from "react";


export default class AdminCreateProductPage extends React.Component {
    state = {
        categories: [],
        images: [{src: "", file: null}],
        tags: []
    }
    // const categories = [
    //     {id: 1, title: "Электроника", path: "/1/"},
    //     {id: 2, title: "Одежда", path: "/2/"},
    // ]

    componentDidMount() {
        // axios.get('http://0.0.0.0:80/categories').then(response => {
        //     this.setState({
        //         ...this.state,
        //         categories: response.data
        //     });
        // });
        
    }

    setTags(newTags) {
        const newState = {...this.state}
        newState.tags = newTags
        this.setState(newState)
    }
    addEmptyTag() {
        this.setTags([...tags, {value: ""}]);
    }
    deleteTag(idx) {
        let newTags = [...tags];
        newTags.splice(idx, 1)
        this.setTags(newTags)
    }

    changeTagValue(idx, value) {
        let newTags = [...tags];
        newTags[idx].value = value;
        this.setTags(newTags);
    }

    setImages(newImages) {
        const newState = {...this.state}
        newState.images = newImages
        this.setState(newState)
    }
    addEmptyImage() {
        this.setImages([...this.state.images, {src: "", file: null}]);
    }
    deleteImage(idx) {
        let newImages = [...this.state.images];
        newImages.splice(idx, 1)
        this.setImages(newImages)
    }

    changeImage(idx, file) {
        let newImages = [...this.state.images];
        newImages[idx].src = URL.createObjectURL(file);
        newImages[idx].file = file;
        this.setImages(newImages);
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
                    
                    <label className="mb-3">Атрибуты</label>
                    { this.state.tags.map((tag, idx) => (
                    <div key={idx} className="mb-3">
                        <div className="row align-items-end">
                            <div className="col-md-5">
                                <label htmlFor={"inputTag" + idx + "Title"} className="form-label">Название атрибута</label>
                                <input type="text" className="form-control" id={"inputTag" + idx + "Title"} value={tag.title} onChange={(e) => this.changeTagTitle(idx, e.target.value)} />
                            </div>
                            <div className="col-md-5">
                                <label htmlFor={"inputTag" + idx + "Value"} className="form-label">Значение атрибута</label>
                                <input type="text" className="form-control" id={"inputTag" + idx + "Value"} value={tag.value} onChange={(e) => this.changeTagValue(idx, e.target.value)}/>
                            </div>
                            <div className="col-md-2">
                                <div onClick={() => this.deleteTag(idx)} className="btn btn-danger mt-3">Удалить</div>
                            </div>
                        </div>
                    </div>
                    ))}
                    <div onClick={this.addEmptyTag} className="btn btn-success mb-3">Добавить атрибут</div>

                    <div className="mb-3">
                        <label className="mb-3">Фотографии</label>
                        

                        { this.state.images.map((image, idx) => (
                        <div key={idx} className="mb-3">
                            <div className="row align-items-end">
                                <div className="col-md-10">
                                    <img className="mb-3" style={{maxWidth: "100%"}} src={image.src} alt="" />
                                    <input type="file" className="form-control" id={"inputImage" + idx} onChange={(e) => this.changeImage(idx, e.target.files[0])} />
                                </div>
                                <div className="col-md-2">
                                    <div onClick={() => this.deleteImage(idx)} className="btn btn-danger mt-3">Удалить</div>
                                </div>
                            </div>
                        </div>
                        ))}
                        <div onClick={() => this.addEmptyImage()} className="btn btn-success mb-3">Добавить изображение</div>
                    </div>

                    <div>
                        <div type="submit" className="btn btn-primary">Зарегистрировать</div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
