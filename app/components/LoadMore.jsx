function LoadMore({ title }) {
    return (
        <div className="row load-more-btn-row">
            <div className="col-md-12">
                <div className="load-more-btn-area text-center text-uppercase mx-auto">
                    <p
                        href="#"
                        className="load-more-btn mx-auto"
                    >
                        {title}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoadMore;
