package com.example.f1_dashboard.f1schedule;

public class F1Schedule {
    String startDate;
    String endDate;
    String gPrx;
    String crct;
    String winner;
    Boolean completed;

    public F1Schedule(String startDate, String endDate, String gPrx, String crct, String winner, Boolean completed) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.gPrx = gPrx;
        this.crct = crct;
        this.winner = winner;
        this.completed = completed;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getgPrx() {
        return gPrx;
    }

    public void setgPrx(String gPrx) {
        this.gPrx = gPrx;
    }

    public String getCrct() {
        return crct;
    }

    public void setCrct(String crct) {
        this.crct = crct;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    @Override
    public String toString() {
        return "F1Schedule{" +
                "startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", gPrx='" + gPrx + '\'' +
                ", crct='" + crct + '\'' +
                ", winner='" + winner + '\'' +
                ", completed=" + completed +
                '}';
    }
}
