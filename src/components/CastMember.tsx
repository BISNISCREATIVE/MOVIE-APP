
interface CastMemberProps {
  person: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  };
}

export const CastMember = ({ person }: CastMemberProps) => {
  return (
    <div className="text-center">
      <div className="w-full aspect-square rounded-full overflow-hidden mb-3 bg-muted">
        {person.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
            alt={person.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="text-2xl">👤</span>
          </div>
        )}
      </div>
      <h3 className="font-semibold text-sm mb-1">{person.name}</h3>
      <p className="text-xs text-muted-foreground">{person.character}</p>
    </div>
  );
};
