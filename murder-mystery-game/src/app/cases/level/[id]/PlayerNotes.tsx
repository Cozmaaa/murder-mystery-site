//TODO: Small bug when the text gets too big the font gets blurry 

interface UserNoteProps {
  caseLevel: number;
  content: string;
  onContentChange:(newContent:string)=>void;
}

const PlayerNotes: React.FC<UserNoteProps> = ({ caseLevel, content,onContentChange }) => {
  const handleOnTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(e.target.value);
  };

  return (
    <div>
      <textarea
        value={content}
        placeholder="Write your notes here..."
        onChange={handleOnTextChange}
        rows={10}
        style={{
          width: "100%",
          height:"40vh",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          marginTop: "10px",
          minHeight: "50px",
        }}
      ></textarea>
    </div>
  );
};

export default PlayerNotes;
