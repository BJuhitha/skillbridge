package com.skillbridge.dto;

import com.skillbridge.model.User;
import java.util.List;

public class MatchDto {
    private User peer;
    private List<String> peerCanTeachYou; // Skills the peer teaches that you want to learn
    private List<String> youCanTeachPeer; // Skills you teach that the peer wants to learn
    private boolean isMutualExchange;    // True if both can teach each other!
    private int matchScore;

    public MatchDto() {}

    public MatchDto(User peer, List<String> peerCanTeachYou, List<String> youCanTeachPeer, boolean isMutualExchange, int matchScore) {
        this.peer = peer;
        this.peerCanTeachYou = peerCanTeachYou;
        this.youCanTeachPeer = youCanTeachPeer;
        this.isMutualExchange = isMutualExchange;
        this.matchScore = matchScore;
    }

    public User getPeer() {
        return peer;
    }

    public void setPeer(User peer) {
        this.peer = peer;
    }

    public List<String> getPeerCanTeachYou() {
        return peerCanTeachYou;
    }

    public void setPeerCanTeachYou(List<String> peerCanTeachYou) {
        this.peerCanTeachYou = peerCanTeachYou;
    }

    public List<String> getYouCanTeachPeer() {
        return youCanTeachPeer;
    }

    public void setYouCanTeachPeer(List<String> youCanTeachPeer) {
        this.youCanTeachPeer = youCanTeachPeer;
    }

    public boolean isMutualExchange() {
        return isMutualExchange;
    }

    public void setMutualExchange(boolean mutualExchange) {
        isMutualExchange = mutualExchange;
    }

    public int getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(int matchScore) {
        this.matchScore = matchScore;
    }
}
