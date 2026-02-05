const Course = ({course}) => {
    const courseParts = course.parts;
    return (
        <div>
        <h1>{ course.name }</h1>
        { courseParts.map(content => <p key={content.id}>{ content.name } { content.exercises }</p>) }
        {  }
        <p>
            <strong>
            total of { courseParts.reduce((sum, value) => sum + value.exercises, 0) } exercises
            </strong> 
        </p>
        </div>
    )
}

export default Course