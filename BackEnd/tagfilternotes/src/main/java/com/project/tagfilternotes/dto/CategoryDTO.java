package com.project.tagfilternotes.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {
    

    private long id;

    @NotNull
    @Size(min=4, max = 100)
    private String name; 
    
    private List<String> notes;
}
