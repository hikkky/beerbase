interface Props {
  scores: {
    bodyScore: number;
    sournessScore: number;
    sweetnessScore: number;
    aromaScore: number;
    bitternessScore: number;
  };
  className?: string;
}

export function RadarChart({
  scores: {
    bodyScore,
    sournessScore,
    sweetnessScore,
    aromaScore,
    bitternessScore,
  },
  className,
}: Props) {
  const maxScore = 5;
  const chartSize = 200;
  const center = chartSize / 2;
  const maxRadius = 70;
  const labelRadius = 84;
  const axes = [
    { key: "bodyScore", label: "ボディ", value: bodyScore },
    { key: "sournessScore", label: "酸味", value: sournessScore },
    { key: "sweetnessScore", label: "甘味", value: sweetnessScore },
    { key: "aromaScore", label: "香り", value: aromaScore },
    { key: "bitternessScore", label: "苦味", value: bitternessScore },
  ] as const;

  const clampScore = (value: number) => Math.min(Math.max(value, 0), maxScore);

  const getAngle = (index: number) =>
    -Math.PI / 2 + (2 * Math.PI * index) / axes.length;

  const pointFor = (angle: number, radius: number) => ({
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
  });

  const gridLevels = 5;
  const gridPolygons = Array.from({ length: gridLevels }, (_, level) => {
    const radius = (maxRadius * (level + 1)) / gridLevels;
    return axes
      .map((_, index) => {
        const angle = getAngle(index);
        const { x, y } = pointFor(angle, radius);
        return `${x},${y}`;
      })
      .join(" ");
  });

  const dataPoints = axes
    .map((axis, index) => {
      const score = clampScore(axis.value);
      const radius = (maxRadius * score) / maxScore;
      const angle = getAngle(index);
      const { x, y } = pointFor(angle, radius);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${chartSize} ${chartSize}`}
      className={className}
      role="img"
      aria-label="Beer flavor radar chart"
    >
      <g>
        {gridPolygons.map((points, index) => (
          <polygon
            key={`grid-${index}`}
            points={points}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
      </g>
      <g>
        {axes.map((_, index) => {
          const angle = getAngle(index);
          const { x, y } = pointFor(angle, maxRadius);
          return (
            <line
              key={`axis-${index}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}
      </g>
      <polygon
        points={dataPoints}
        fill="rgba(251, 146, 60, 0.35)"
        stroke="#f97316"
        strokeWidth="2"
      />
      <g>
        {axes.map((axis, index) => {
          const angle = getAngle(index);
          const { x, y } = pointFor(angle, labelRadius);
          const anchor =
            Math.cos(angle) > 0.2
              ? "start"
              : Math.cos(angle) < -0.2
                ? "end"
                : "middle";
          return (
            <text
              key={`label-${axis.key}`}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize="10"
              fill="#4b5563"
            >
              {axis.label}
            </text>
          );
        })}
      </g>
    </svg>
  );
}
