function hoverLinkedIn(isHovering) {
    const linkedInImage = document.getElementById('linked_in');
    if (isHovering) {
        linkedInImage.src = 'Assets/Images/linkedin_black.jpg'
    } else {
        linkedInImage.src = 'Assets/Images/linkedin_white.jpg';
    }
}