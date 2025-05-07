from PyQt6.QtWidgets import QWidget, QVBoxLayout, QLabel
from PyQt6.QtCore import Qt, QTimer, QPointF, pyqtSignal
from PyQt6.QtGui import QPainter, QColor, QRadialGradient
import math

class LoadingSpinnerUI(QWidget):
    done = pyqtSignal(bool, str)  # (success, message)

    def __init__(self, message="Validating key..."):
        super().__init__()
        self.setWindowFlags(Qt.WindowType.FramelessWindowHint | Qt.WindowType.WindowStaysOnTopHint)
        self.setFixedSize(320, 320)  # Slightly larger window
        self.setStyleSheet("background-color: #111111; border-radius: 18px;")

        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 20, 0, 20)
        layout.setAlignment(Qt.AlignmentFlag.AlignCenter)  # Center everything vertically

        self.label = QLabel(message)
        self.label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.label.setStyleSheet("color: #c8d6e5; font-size: 17px; font-weight: bold;")
        layout.addWidget(self.label)

        self.angle = 0
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.rotate)
        self.timer.start(30)

    def rotate(self):
        self.angle = (self.angle + 3) % 360
        self.update()

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        center = self.rect().center()
        radius = 85  # Slightly bigger circle
        dot_radius = 10

        for i in range(12):
            angle_rad = math.radians(self.angle + i * 30)
            alpha = int(255 * (i + 1) / 12)
            glow_strength = (math.sin(math.radians(self.angle + i * 30)) + 1) / 2
            glow_radius = dot_radius + glow_strength * 4
            x = center.x() + radius * math.cos(angle_rad)
            y = center.y() + radius * math.sin(angle_rad)
            gradient = QRadialGradient(QPointF(x, y), glow_radius)
            gradient.setColorAt(0, QColor(100, 180, 255, int(alpha * 1.2)))
            gradient.setColorAt(1, QColor(100, 180, 255, 0))
            painter.setBrush(gradient)
            painter.setPen(Qt.PenStyle.NoPen)
            painter.drawEllipse(QPointF(x, y), glow_radius, glow_radius)

    def set_message(self, text):
        self.label.setText(text)

    def finish(self, success, message):
        self.set_message(message)
        QTimer.singleShot(1800, lambda: self.done.emit(success, message))