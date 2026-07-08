export default function CategoryCard({ title, icon, color }) {
  const handleClick = () => {
  const loggedIn = document.cookie.includes("session=");
  if (!loggedIn) {
    window.location.href = "/login";
  } else {
    window.location.href = "/dashboard/user";
  }
};

  return (
    <div
      className={`p-6 rounded-xl shadow text-white font-semibold ${color} cursor-pointer`}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <div>{title}</div>
    </div>
  );
}
