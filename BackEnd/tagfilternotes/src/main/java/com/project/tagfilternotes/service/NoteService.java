package com.project.tagfilternotes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.tagfilternotes.dto.NoteDTO;
import com.project.tagfilternotes.entity.CategoryEntity;
import com.project.tagfilternotes.entity.NoteEntity;
import com.project.tagfilternotes.exception.ResourceNotFound;
import com.project.tagfilternotes.repository.NoteRepository;
import com.project.tagfilternotes.util.NoteMapper;

import jakarta.transaction.Transactional;

@Service
public class NoteService {

@Autowired
private NoteRepository noteRepository;


@Autowired
private CategoryService categoryService;

@Autowired
private NoteMapper noteMapper;

    @Transactional
    public List<NoteDTO> getAllNotes() {
            return noteMapper.toDtoList(noteRepository.findAll());
    }

    @Transactional
    public List<NoteDTO> getAllActiveNotes() {
   return noteMapper.toDtoList(noteRepository.findByActiveTrue());
    }
    @Transactional
    public List<NoteDTO> getAllInactiveNotes() {
       return noteMapper.toDtoList(noteRepository.findByActiveFalse());
    }

    @Transactional
    public NoteDTO getNoteById(Long id) {
        return noteMapper.toDto(noteRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Note not found")));
    }


    public List<NoteDTO> getAllNotesByCategoryName(String categoryName) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getNoteById'");
    }

    
   @Transactional
    public NoteDTO createNote(NoteDTO noteDTO) {
        List<CategoryEntity> ctgories =  categoryService.FindOrCreateCategory(noteDTO.getCategories());
        
        NoteEntity noteEntity = noteMapper.toEntity(noteDTO);

        noteEntity.setCategories(ctgories);

        for (CategoryEntity ct : ctgories){
            ct.getNotes().add(noteEntity);
        }
        

        NoteEntity savedEntity = noteRepository.save(noteEntity);
        
        
        return noteMapper.toDto(savedEntity);
    
    }

    @Transactional
    public NoteDTO updateNoteById(Long id, NoteDTO noteDTO) {
        NoteEntity nEntity =  noteRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Note not found"));
        nEntity.setTitle(noteDTO.getTitle());
        nEntity.setContent(noteDTO.getContent());
        nEntity.setActive(noteDTO.isActive());
    
        List<CategoryEntity> categories = categoryService.FindOrCreateCategory(noteDTO.getCategories());
        nEntity.setCategories(categories);
        categories.forEach(category -> category.getNotes().add(nEntity));

    return noteMapper.toDto(noteRepository.save(nEntity));
    }

    @Transactional
    public void deleteNoteById(Long id) {
        NoteEntity note = (noteRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Note not found")));

        for (CategoryEntity categoryEntity: note.getCategories()){
            categoryEntity.getNotes().remove(note);
        }

        noteRepository.delete(note);
    }
    


}
