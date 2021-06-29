const Header = (props) => {
  return (
    <>
      <h1>{props.header}</h1>
    </>
  );
};
const Content = (props) => {
  return (
    <div>
      {props.parts.map((x) => (
        <ul key={x.id}>
          <li >
            <Parts part={x.name} excersice={x.exercises} />
          </li>
        </ul>
      ))}
    </div>
  );
};
const Parts = (props) => {
  return (
    <>
      {props.part} {props.excersice}
    </>
  );
};

const Total = (props) => {
  return <> Total of {props.total} exercises </>;
};
const Course = (props) => {
  let allsums = props.course.parts.reduce((acc, curval) => acc + curval.exercises, 0);
  return (
    <div>
      <Header header={props.course.name} />
      <Content parts={props.course.parts}  />
      <Total total={allsums} />
    </div>
  );
};
export default Course;
