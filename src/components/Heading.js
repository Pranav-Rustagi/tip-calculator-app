const Heading = props => {
    let title = [...props.title];
    let splitInd = title.length / 2;
    return (
        <header className="mb-4 mt-5 mt-lg-0">
            <h5 className="h5 text-center text-uppercase fw-bold">
                <span>{ title.slice(0, splitInd).join("") }</span>
                <br/>
                <span className="mt-2 d-inline-block">{ title.slice(splitInd).join("") }</span>
            </h5>
        </header>
    )
}

export default Heading;