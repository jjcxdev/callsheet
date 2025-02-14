import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { InputFormProps } from "@/types";
import { addNote, updateNote, deleteNote } from "@/constants/ui";
import { initializeUtils } from "@/constants/ui";
export function Notes({ data, onChange }: InputFormProps) {
  initializeUtils({ data, onChange });
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Notes</h3>
      {data.notes.map((note, index) => (
        <div key={index} className="mb-2 flex gap-2">
          <Input
            placeholder="Note"
            value={note.note}
            onChange={(e) => updateNote(index, "note", e.target.value)}
          />
          <Button
            type="button"
            variant="destructive"
            onClick={() => deleteNote(index)}
          >
            X
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addNote}>
        Add Note
      </Button>
    </div>
  );
}
