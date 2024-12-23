package com.project.tagfilternotes.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "notes")
public class NoteEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "The title can't be empty")
    @Column(nullable = false, unique = true)
    @Size(min=4, max = 100, message = "The title should be between 4 and 100 characters")
    private String title;

    @NotNull(message = "The content can't be empty")
    @Column(nullable = false)
    @Size(min=4, max = 1500, message = "The content should be between 4 and 1500 characters")
    private String content;

    @NotNull(message = "The active status can't be empty")
    @Column(nullable=false)
    private boolean active;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "note_category",joinColumns = @JoinColumn(name="note_id"),inverseJoinColumns = @JoinColumn(name="category_id"))
    private List<CategoryEntity> categories = new ArrayList<>();



}
