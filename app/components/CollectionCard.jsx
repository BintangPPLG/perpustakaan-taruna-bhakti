export default function CollectionCard({ title, desc, color }) {
  const handleClick = () => {
  const loggedIn = document.cookie.includes("session=");
  if (!loggedIn) {
    window.location.href = "/login";
  } else {
    window.location.href = "/dashboard/user";
  }
};

  return (
    <div className={`p-6 rounded-xl shadow text-white ${color} font-semibold`}>
      <h3 className="text-xl">{title}</h3>
      <p className="text-sm opacity-90">{desc}</p>
    </div>
  );
}
