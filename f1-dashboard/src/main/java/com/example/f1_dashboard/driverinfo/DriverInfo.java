package com.example.f1_dashboard.driverinfo;

import java.util.List;

public class DriverInfo {

    private String id;
    private String firstName;
    private String lastName;
    private String displayName;
    private String shortName;
    private String dateOfBirth;
    private String headshot;
    private Flag flag;
    private Status status;

    // Constructor
    public DriverInfo(String id, String firstName, String lastName, String displayName, String shortName, String dateOfBirth, String headshot, Flag flag, Status status) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.displayName = displayName;
        this.shortName = shortName;
        this.dateOfBirth = dateOfBirth;
        this.headshot = headshot;
        this.flag = flag;
        this.status = status;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public String getShortName() { return shortName; }
    public void setShortName(String shortName) { this.shortName = shortName; }
    public String getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public String getHeadshot() { return headshot; }
    public void setHeadshot(String headshot) { this.headshot = headshot; }
    public Flag getFlag() { return flag; }
    public void setFlag(Flag flag) { this.flag = flag; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    @Override
    public String toString() {
        return "DriverInfo{" +
                "id='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", displayName='" + displayName + '\'' +
                ", shortName='" + shortName + '\'' +
                ", dateOfBirth='" + dateOfBirth + '\'' +
                ", headshot='" + headshot + '\'' +
                ", flag='" + flag + '\'' +
                ", status='" + status + '\'' +
                '}';
    }

    public static class Flag {
        private String href;
        private String alt;
        private List<String> rel;

        // Getters and Setters
        public String getHref() { return href; }
        public void setHref(String href) { this.href = href; }
        public String getAlt() { return alt; }
        public void setAlt(String alt) { this.alt = alt; }
        public List<String> getRel() { return rel; }
        public void setRel(List<String> rel) { this.rel = rel; }

        @Override
        public String toString() {
            return "Flag{" +
                    "href='" + href + '\'' +
                    ", alt='" + alt + '\'' +
                    ", rel=" + rel +
                    '}';
        }
    }

    public static class Status {
        private String id;
        private String name;
        private String type;
        private String abbreviation;

        // Getters and Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public String getAbbreviation() { return abbreviation; }
        public void setAbbreviation(String abbreviation) { this.abbreviation = abbreviation; }

        @Override
        public String toString() {
            return "Status{" +
                    "id='" + id + '\'' +
                    ", name='" + name + '\'' +
                    ", type='" + type + '\'' +
                    ", abbreviation='" + abbreviation + '\'' +
                    '}';
        }
    }
}

