import { Card } from "react-bootstrap";

export default function ProfileCard({ user }) {
    const placeholderAvatar =
        "https://via.placeholder.com/150?text=No+Avatar";

    return (
        <Card className="shadow-lg border-0 p-3 text-center">
            <Card.Img
                variant="top"
                src={user.avatar || placeholderAvatar}
                alt={user.name}
                className="rounded-circle mx-auto mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <Card.Body>
                <Card.Title className="fw-bold">{user.name}</Card.Title>
                <Card.Text className="text-muted mb-2">@{user.username}</Card.Text>
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Role: {user.role || "Member"}</Card.Text>
                <Card.Text>
                    Bio: {user.bio || "No bio provided yet."}
                </Card.Text>
                <Card.Text className="text-muted">
                    Joined: {user.joinDate || "Unknown"}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}