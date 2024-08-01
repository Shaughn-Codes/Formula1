package com.example.f1_dashboard.f1news;

import java.util.List;

public class F1News {
    public F1News(String dataSourceIdentifier, String description, String headline, String link, List<Images> images) {
        this.dataSourceIdentifier = dataSourceIdentifier;
        this.description = description;
        this.headline = headline;
        this.link = link;
        this.images = images;
    }

    public String getDataSourceIdentifier() {
        return dataSourceIdentifier;
    }

    public void setDataSourceIdentifier(String dataSourceIdentifier) {
        this.dataSourceIdentifier = dataSourceIdentifier;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public List<Images> getImages() {
        return images;
    }

    public void setImages(List<Images> images) {
        this.images = images;
    }

    @Override
    public String toString() {
        return "F1News{" +
                "dataSourceIdentifier='" + dataSourceIdentifier + '\'' +
                ", description='" + description + '\'' +
                ", headline='" + headline + '\'' +
                ", link='" + link + '\'' +
                ", images=" + images +
                '}';
    }

    String dataSourceIdentifier;
    String description;
    String headline;
    String link;
    List<Images> images;

    public static class Images{
        public Images(String dataSourceIdentifier, String name, int width, int height, int id, String credit, String url) {
            this.dataSourceIdentifier = dataSourceIdentifier;
            this.name = name;
            this.width = width;
            this.height = height;
            this.id = id;
            this.credit = credit;
            this.url = url;
        }

        public String getDataSourceIdentifier() {
            return dataSourceIdentifier;
        }

        public void setDataSourceIdentifier(String dataSourceIdentifier) {
            this.dataSourceIdentifier = dataSourceIdentifier;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getWidth() {
            return width;
        }

        public void setWidth(int width) {
            this.width = width;
        }

        public int getHeight() {
            return height;
        }

        public void setHeight(int height) {
            this.height = height;
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getCredit() {
            return credit;
        }

        public void setCredit(String credit) {
            this.credit = credit;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        @Override
        public String toString() {
            return "Images{" +
                    "dataSourceIdentifier='" + dataSourceIdentifier + '\'' +
                    ", name='" + name + '\'' +
                    ", width=" + width +
                    ", height=" + height +
                    ", id=" + id +
                    ", credit='" + credit + '\'' +
                    ", url='" + url + '\'' +
                    '}';
        }

        private String dataSourceIdentifier;
        private String name;
        private int width;
        private int height;
        private int id;
        private String credit;
        private String url;
    }
}


