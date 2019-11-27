import Peer from 'peerjs';

export interface PeerHash {
  [id: string]: Peer.DataConnection;
}
