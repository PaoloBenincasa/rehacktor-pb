export default function BarChart({ ratings= [0] }) {
  const ratingColors = {
    exceptional: "#20a749",
    recommended: "#0d6efd",
    meh: "#ff9800",
    skip: "#f44336",
  };

  const orderedRatings = ['exceptional', 'recommended', 'meh', 'skip']
    .map(title => {
      return ratings.find(rating => rating.title?.toLowerCase() === title) || { title, percent: 0 };
    })
    .filter(rating => rating.percent > 0);

  console.log(ratings);

  return (
    <div className="chartContainer mb-4">
      {orderedRatings.map((rating) => {
        const width = rating?.percent || 0;
        const color = ratingColors[rating?.title.toLowerCase()] || '#007bff';

        return (
          <div className="d-flex flex-column">
            <div className="d-flex">
              <p className="mb-1 mt-1"> <span style={{color: color}}>✪</span> {rating.title}: {Math.round(rating?.percent || 0)}%</p>
            </div>
            <div
              key={rating?.id}
              style={{
                height: '26px',
                width: `${width}%`,
                backgroundColor: color,
                position: 'relative',
                borderEndEndRadius: '8px',
                borderStartEndRadius: '8px',
              }}
            >
            </div>
          </div>

        );
      })}
    </div>
  )
}