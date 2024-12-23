package com.project.tagfilternotes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.tagfilternotes.dto.NoteDTO;
import com.project.tagfilternotes.service.NoteService;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    

    @Autowired
    private NoteService noteService;


    @GetMapping
    public List<NoteDTO> getAllNotes(){
        return noteService.getAllNotes();
    }

    @GetMapping("/active")
    public List<NoteDTO> getAllActiveNotes(){
        return noteService.getAllActiveNotes();
    }

    @GetMapping("/inactive")
    public List<NoteDTO> getAllInactiveNotes(){
        return noteService.getAllInactiveNotes();
    }


    @GetMapping("/{id}")
    public ResponseEntity<NoteDTO> getNoteById(@PathVariable Long id){
        return ResponseEntity.ok(noteService.getNoteById(id));
    }

    @GetMapping("/filter/{categoryName}")
    public List<NoteDTO> getAllNotesByCategoryName(@PathVariable String categoryName){
        return noteService.getAllNotesByCategoryName(categoryName);
    }

   @PostMapping
   public NoteDTO createNote(@RequestBody NoteDTO noteDTO){
    return noteService.createNote(noteDTO); 
    }

   @PutMapping("/{id}")
  public ResponseEntity<NoteDTO> updateNoteById(@PathVariable Long id,@RequestBody NoteDTO noteDTO){
        return ResponseEntity.ok(noteService.updateNoteById(id, noteDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNoteById(@PathVariable Long id){
        noteService.deleteNoteById(id);
        return ResponseEntity.noContent().build();
    }


    


}
