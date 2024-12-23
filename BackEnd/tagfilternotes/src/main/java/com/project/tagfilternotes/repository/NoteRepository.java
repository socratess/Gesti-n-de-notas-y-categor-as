package com.project.tagfilternotes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.tagfilternotes.entity.NoteEntity;
import java.util.List;


@Repository
public interface NoteRepository  extends JpaRepository<NoteEntity,Long> {
    
    List<NoteEntity> findByActiveTrue();
    List<NoteEntity> findByActiveFalse();
}
