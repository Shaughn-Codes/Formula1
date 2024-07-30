package com.example.f1_dashboard.driverstats;

public class DriverStats {
    public DriverStats(int year, int rank, int starts, int wins, int poles, int top5, int top10, int points) {
        this.year = year;
        this.rank = rank;
        this.starts = starts;
        this.wins = wins;
        this.poles = poles;
        this.top5 = top5;
        this.top10 = top10;
        this.points = points;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public int getStarts() {
        return starts;
    }

    public void setStarts(int starts) {
        this.starts = starts;
    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getPoles() {
        return poles;
    }

    public void setPoles(int poles) {
        this.poles = poles;
    }

    public int getTop5() {
        return top5;
    }

    public void setTop5(int top5) {
        this.top5 = top5;
    }

    public int getTop10() {
        return top10;
    }

    public void setTop10(int top10) {
        this.top10 = top10;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    @Override
    public String toString() {
        return "DriverStats{" +
                "year=" + year +
                ", rank=" + rank +
                ", starts=" + starts +
                ", wins=" + wins +
                ", poles=" + poles +
                ", top5=" + top5 +
                ", top10=" + top10 +
                ", points=" + points +
                '}';
    }

    private int year;
    private int rank;
    private int starts;
    private int wins;
    private int poles;
    private int top5;
    private int top10;
    private int points;


}
