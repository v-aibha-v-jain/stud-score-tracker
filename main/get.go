package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

type Subject struct {
	Name     string `json:"name"`
	Internal int    `json:"internal"`
	External int    `json:"external"`
}

type Semester struct {
	Semester int      `json:"semester"`
	Subjects []Subject `json:"subjects"`
	SGPA     float64  `json:"sgpa"`
}

func main() {
	var sem int
	fmt.Println("Enter semester your in right now:")
	fmt.Scanf("%d", &sem)

	var subjects []Subject
	for {
		var subjectName string
		fmt.Println("Enter subject name (or 'q' to quit):")
		fmt.Scanf("%s", &subjectName)
		if subjectName == "q" {
			break
		}

		var internal, external int
		fmt.Println("Enter internal and external marks (out of 100):")
		fmt.Scanf("%d %d", &internal, &external)

		subjects = append(subjects, Subject{Name: subjectName, Internal: internal, External: external})
	}

	sgpa := calculateSGPA(subjects)
	semesterData := Semester{Semester: sem, Subjects: subjects, SGPA: sgpa}

	fileName := "progress.json"
	data, err := json.Marshal(semesterData)
	if err != nil {
		fmt.Println("Error marshalling data:", err)
		return
	}

	err = ioutil.WriteFile(fileName, data, 0644)
	if err != nil {
		fmt.Println("Error writing data to file:", err)
		return
	}

	fmt.Printf("Semester %d data saved to %s\n", sem, fileName)
}

func calculateSGPA(subjects []Subject) float64 {
	totalCredits := 0.0
	totalPoints := 0.0
	for _, subject := range subjects {
		credits := 4.0 // Assuming all subjects are 4 credits (modify as needed)
		marks := (float64(subject.Internal) + float64(subject.External)) / 2.0
		gradePoint := getGradePoint(marks)
		totalCredits += credits
		totalPoints += gradePoint * credits
	}
	return totalPoints / totalCredits
}

func getGradePoint(marks float64) float64 {
	if marks >= 90 {
		return 10.0
	} else if marks >= 80 {
		return 9.0
	} else if marks >= 70 {
		return 8.0
	} else if marks >= 60 {
		return 7.0
	} else if marks >= 50 {
		return 6.0
	} else {
		return 0.0
	}
}
