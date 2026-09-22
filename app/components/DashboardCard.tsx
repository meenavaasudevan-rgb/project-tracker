type DashboardCardProps = {
  title: string;
  value: number;
  icon: string;
};

export default function DashboardCard({
  title,
  value,
  icon,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300">

      <div className="text-3xl mb-3">
        {icon}
      </div>

      <h2 className="text-gray-500 text-sm">
        {title}
      </h2>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
}