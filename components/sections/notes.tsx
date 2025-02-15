import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { InputFormProps } from "@/types";
import { addNote, updateNote, deleteNote } from "@/constants/ui";
import { initializeUtils } from "@/constants/ui";
import { X } from "lucide-react";

export function Notes({ data, onChange }: InputFormProps) {
  initializeUtils({ data, onChange });
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Notes</h3>
      {data.notes.map((note, index) => (
        <div key={index} className="group relative mb-2 flex gap-2">
          <Input
            placeholder="Note"
            value={note.note}
            onChange={(e) => updateNote(index, "note", e.target.value)}
          />
          {index > 0 && (
            <div className="absolute -right-2 -top-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <Button
                type="button"
                className="h-fit w-fit rounded-full p-0.5"
                variant="destructive"
                onClick={() => deleteNote(index)}
              >
                <X className="h-1 w-1" />
              </Button>
            </div>
          )}
        </div>
      ))}
      <Button type="button" onClick={addNote}>
        Add Note
      </Button>
    </div>
  );
}
